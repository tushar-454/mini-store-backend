import { NextFunction, Request, Response } from 'express';
import { findCouponByProperty } from '../../services/coupon/find_coupon_by_property';
import { createOrderService } from '../../services/order/create_order';
import { findProductByProperty } from '../../services/product/find_product_by_property';
import { CreateOrderInput } from '../../validation/order/create_order';

const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { address, district, division, sub_district, line_items, coupon_code, name, email, phone, instruction } = req.body as CreateOrderInput;
    const populate_line_items = await Promise.all(
      line_items.map(async (item) => {
        const { product_id, variant } = item;
        const product = await findProductByProperty('_id', product_id.toString());
        if (!product) {
          throw new Error('Product not found');
        }
        return {
          ...item,
          price: product.variants.find((v) => v.name === variant)?.price || product.price,
          discount: product.discount,
        };
      })
    );
    const { price, discount } = populate_line_items.reduce(
      (acc, cur) => {
        const curDiscount = cur.price * cur.quantity * (cur.discount / 100);
        const curPrice = cur.price * cur.quantity;
        acc.discount = acc.discount + curDiscount;
        acc.price = acc.price + curPrice - curDiscount;
        return acc;
      },
      {
        discount: 0,
        price: 0,
      }
    );
    let shipping = 120;
    if (division === 'Dhaka') shipping = 80;
    // Check if coupon code is valid
    let coupon_discount = 0;
    if (coupon_code) {
      const is_coupon_valid = await findCouponByProperty('code', coupon_code);
      if (!is_coupon_valid) {
        res.status(400).json({ success: false, message: 'Invalid coupon code' });
        return;
      }
      const { expireAt, quantity, type, discount } = is_coupon_valid;
      if (expireAt && new Date().getTime() < Date.now()) {
        res.status(400).json({ success: false, message: 'Coupon code has expired' });
        return;
      }
      if (quantity === 0) {
        res.status(400).json({ success: false, message: 'Coupon code has been exhausted' });
        return;
      }
      if (type === 'flat') {
        coupon_discount = discount;
      } else if (type === 'percentage') {
        coupon_discount = price * (discount / 100);
      }
    }
    const actual_price = +(price + shipping - coupon_discount).toFixed(2);
    const order = await createOrderService({
      name,
      email,
      phone,
      line_items: populate_line_items,
      price: actual_price < 0 ? 0 : actual_price,
      discount: +discount.toFixed(2),
      shipping,
      division,
      district,
      sub_district,
      address,
      coupon_code,
      coupon_discount: +coupon_discount.toFixed(2),
      tracking_id: +Date.now().toString().slice(4),
      instruction,
    });
    if (coupon_code) {
      const coupon = await findCouponByProperty('code', coupon_code);
      if (coupon && coupon.quantity) {
        coupon.quantity -= 1;
        await coupon.save();
      }
    }
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export { createOrder };

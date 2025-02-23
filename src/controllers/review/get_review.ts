import { NextFunction, Request, Response } from 'express';
import { getReviewService } from '../../services/review/get_review';

const getReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { is_deleted } = req.query;
    if (is_deleted === 'all') {
      const reviews = await getReviewService({});
      res.status(200).json({ success: true, data: reviews });
      return;
    } else if (is_deleted === 'true') {
      const reviews = await getReviewService({ is_deleted: true });
      res.status(200).json({ success: true, data: reviews });
      return;
    }
    const reviews = await getReviewService({ is_deleted: false });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

export { getReview };

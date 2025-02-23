import { IReview, Review } from '../../models/Review';

type TQuery = {
  is_deleted?: boolean;
};

const getReviewService = async (query: TQuery): Promise<IReview[] | undefined> => {
  try {
    const { is_deleted } = query;
    const filterQuery: TQuery = {};
    filterQuery['is_deleted'] = is_deleted;
    const reviews = await Review.find(is_deleted === false ? filterQuery : {}).select({
      createdAt: 0,
      updatedAt: 0,
    });
    return reviews || [];
  } catch (error) {
    console.log('Error in getReviewService', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { getReviewService };

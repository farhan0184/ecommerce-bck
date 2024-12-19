import { Model, PipelineStage } from "mongoose";

/**
 * Paginate using Mongoose Aggregation.
 * @param model - Mongoose model.
 * @param pipeline - Aggregation pipeline stages.
 * @param page - Current page (default is 1).
 * @param limit - Number of items per page (default is 10).
 * @returns Paginated data with total count and metadata.
 */
export async function paginate<T>(
  model: Model<T>,
  pipeline: PipelineStage[],
  page: number = 1,
  limit: number = 10
) {
  const skip = (page - 1) * limit;

  // Add pagination stages to the pipeline
  const paginatedPipeline: PipelineStage[] = [
    ...pipeline,
    { $facet: {
        data: [{ $skip: skip }, { $limit: limit }], // Paginated results
        totalCount: [{ $count: "count" }] // Total number of results
      }
    }
  ];

  const result = await model.aggregate(paginatedPipeline).exec();

  // Handle the result structure
  const data = result[0]?.data || [];
  const totalCount = result[0]?.totalCount[0]?.count || 0;

  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    meta: {
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

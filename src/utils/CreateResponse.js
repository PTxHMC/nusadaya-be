const createResponse = (message, data, pagination = null) => {
  const response = {
    message: message,
    data: data,
  };

  if (Array.isArray(data) && pagination) {
    response.pagination = pagination;
  }

  return response;
};

const createPagination = (totalItems, totalPages, currentPage, limit) => {
  return {
    total_items: totalItems,
    total_pages: totalPages,
    current_page: currentPage,
    limit,
  };
};

export { createResponse, createPagination };

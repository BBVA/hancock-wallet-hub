export const res = {
    json: {
        success: true,
    },
    status: 200,
  };

export const HealthCheckController = jest.fn().mockResolvedValue(res);

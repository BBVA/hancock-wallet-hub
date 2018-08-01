import 'jest';

export const res = {
    json: {
        success: true,
    },
    status: 200,
  };

export const healthCheckController = jest.fn().mockResolvedValue(res);

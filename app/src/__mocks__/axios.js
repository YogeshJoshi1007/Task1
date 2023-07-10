const axios = {
    get: jest.fn(() => Promise.resolve({ data: { key: 'value' } })),

    post: jest.fn(() => Promise.resolve({ data:   
                
        {
        phone_number_verified: false,
        message: "Otp Sent !!"
        }
          
     })),
    // Add other mocked Axios methods as needed
  };
  
  export default axios;
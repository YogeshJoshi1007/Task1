
import { render, screen ,waitFor,fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from './Login';
import axios from 'axios';
jest.mock("axios");



describe("differeent phone number fields",()=>{

    test("input field for phone number is present",()=>{

        render(<Login />);

        const inp=screen.getByTestId('inputtest');

        expect(inp).toBeInTheDocument();
             
    })

test("0000000000 should have empty value in number filed ",()=>{

    render(<Login />);

    const inp=screen.getByTestId('inputtest');

    userEvent.type(inp,  '0000000000');

    expect(inp.value).toBe('');
         


})

test("0000000999 will show value 999 in number input",()=>{
render(<Login/>)
    const inp=screen.getByTestId('inputtest');

    userEvent.type(inp,  '0000000999');

    expect(inp.value).toBe('999');
})
test("first digit will be grater than or equal to 6",()=>{

    render(<Login/>)
    const inp=screen.getByTestId('inputtest');

    userEvent.type(inp,  '23456789');

    expect(inp.value).toBe('6789');

})
test("phone number grater than length 10 will be returned as last 10 numbers",()=>{

    render(<Login/>)
    const inp=screen.getByTestId('inputtest');

    userEvent.type(inp, '9990498989842398');

    expect(inp.value).toBe('9990498989');


})
test("phone number grater than length 10 and having zeroes from start",()=>{

    render(<Login/>)
    const inp=screen.getByTestId('inputtest');

    userEvent.type(inp, '000009990498989842398');

    expect(inp.value).toBe('9990498989');


})
test("submit button should be disabled when phone number length smaller than 10",()=>{

    render(<Login/>)
    const inp=screen.getByTestId('inputtest');

    userEvent.type(inp,  '999049');

    const btn=screen.getByRole('button');

    expect(btn).toBeDisabled();

})


})


describe("API request after form sumbit",()=>{


  describe("API fulfilled",()=>{

    test("API request is called with once",async()=>{

        const users ={
            data: {
                phone_number_verified: false,
                message: "Otp Sent !!"
                }
        };
          axios.post.mockResolvedValueOnce(users);
    
          render(<Login/>)
          const inp=screen.getByTestId('inputtest');

          fireEvent.change(inp, { target: { value: '9999999999' } });
      
          const btn=screen.getByTestId('input-continue');
          userEvent.click(btn);

          expect(btn).not.toBeDisabled();

          expect(axios.post).toHaveBeenCalledWith(`http://127.0.0.1:8000/verify/`,{
            phone_number:"9999999999"
          });
          





    })

    test("opt verification page is showing ater api fullfilled",async()=>{

        const users ={
            data: {
                phone_number_verified: false,
                message: "Otp Sent !!"
                }
        };
          axios.post.mockResolvedValueOnce(users);
    
          render(<Login/>)
          const inp=screen.getByTestId('inputtest');

          fireEvent.change(inp, { target: { value: '9999999999' } });
      
          const btn=screen.getByTestId('input-continue');
          userEvent.click(btn);

        
          
       await waitFor(() => {
        expect(screen.getByTestId('otp')).toBeInTheDocument();
        
      });
      await waitFor(() => {
        
        expect(screen.getByText('OTP Verification')).toBeInTheDocument();
       
       
      });
      await waitFor(() => {
      
        expect(screen.getByText('Please enter the 4-digit verification code we sent to your phone number.')).toBeInTheDocument();
       
      });

    })
    test("opt verification page is have four input fields after api reques fulfilled",async()=>{

        const users ={
            data: {
                phone_number_verified: false,
                message: "Otp Sent !!"
                }
        };
          axios.post.mockResolvedValueOnce(users);
    
          render(<Login/>)
          const inp=screen.getByTestId('inputtest');

          fireEvent.change(inp, { target: { value: '9999999999' } });
      
          const btn=screen.getByTestId('input-continue');
          userEvent.click(btn);

          await waitFor(() => {
          expect(screen.getAllByRole('textbox')).toHaveLength(4);
           
          });
       

    })

    test("otp verify button will be enabled when all four otp numbers are entered",async()=>{

        const users ={
            data: {
                phone_number_verified: false,
                message: "Otp Sent !!"
                }
        };
          axios.post.mockResolvedValueOnce(users);
    
          render(<Login/>)
          const inp=screen.getByTestId('inputtest');

          fireEvent.change(inp, { target: { value: '9999999999' } });
      
          const btn=screen.getByTestId('input-continue');
          userEvent.click(btn);

          await waitFor(() => {
          expect(screen.getAllByRole('textbox')).toHaveLength(4);
          expect(screen.getByRole('button')).toBeDisabled();
         
          const inputElements = screen.getAllByRole('textbox');

  fireEvent.change(inputElements[0], { target: { value: '1' } });
  fireEvent.change(inputElements[1], { target: { value: '2' } });
  fireEvent.change(inputElements[2], { target: { value: '3' } });
  fireEvent.change(inputElements[3], { target: { value: '4' } });

  expect(screen.getByRole('button')).not.toBeDisabled();

           
          });

    })

  


  })  
  test("otp verify button will be disabled when either one from four input fields are not entered",async()=>{

    const users ={
        data: {
            phone_number_verified: false,
            message: "Otp Sent !!"
            }
    };
      axios.post.mockResolvedValueOnce(users);

      render(<Login/>)
      const inp=screen.getByTestId('inputtest');

      fireEvent.change(inp, { target: { value: '9999999999' } });
  
      const btn=screen.getByTestId('input-continue');
      userEvent.click(btn);

      await waitFor(() => {
      expect(screen.getAllByRole('textbox')).toHaveLength(4);
      expect(screen.getByRole('button')).toBeDisabled();
     
      const inputElements = screen.getAllByRole('textbox');

fireEvent.change(inputElements[0], { target: { value: '1' } });
fireEvent.change(inputElements[1], { target: { value: '2' } });
fireEvent.change(inputElements[2], { target: { value: '3' } });


expect(screen.getByRole('button')).toBeDisabled();

       
      });

})




    test("API post request failed ",()=>{


           
                 const  message="failed request"
          
            axios.post.mockRejectedValueOnce(new Error(message));
        
              render(<Login/>)
              const inp=screen.getByTestId('inputtest');
    
              fireEvent.change(inp, { target: { value: '9999999999' } });
          
              const btn=screen.getByTestId('input-continue');
              userEvent.click(btn);
    
              expect(axios.post).toHaveBeenCalledWith(`http://127.0.0.1:8000/verify/`,{
                phone_number:"9999999999"
              });
              

        
    
    
      

    })



})
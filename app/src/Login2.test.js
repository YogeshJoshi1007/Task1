
import { render, screen ,waitFor,fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from './Login';
import axios from 'axios';
jest.mock("axios");



describe("test suite 2 ",()=>{

    test("test suite 2",()=>{

        render(<Login />);

        const inp=screen.getByTestId('inputtest');

        expect(inp).toBeInTheDocument();
             
    })




})

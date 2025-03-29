import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ContextProvider from "../context/ContextProvider";
import LoginSection from "../components/user/LoginSection";

describe('Login functionality', () => {
    beforeEach(() => {
        const queryClient = new QueryClient();
        render(
            <ContextProvider>
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <LoginSection />
                    </MemoryRouter>
                </QueryClientProvider>
            </ContextProvider>
        )
    })
    it.only('Shows error when logging in with wrong password', async () => {
        const titleElement = await screen.findByText('Login', { selector: 'h2' })
        const usernameInput = await screen.findByRole('textbox', { name: 'Username' })
        const passwordInput = await screen.findByLabelText('Password')
        const loginBtn = await screen.findByRole('button', { name: 'Login' });

        expect(titleElement).toBeInTheDocument()
        expect(usernameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(loginBtn).toBeInTheDocument()

        await userEvent.type(usernameInput, 'peter')
        await userEvent.type(passwordInput, 'wrongPassword');

        expect(usernameInput).toHaveDisplayValue('peter')
        expect(passwordInput).toHaveDisplayValue('wrongPassword')

        await userEvent.click(loginBtn);

        const errorMessage = await screen.findByText("Invalid username/password", { exact: false });
        expect(errorMessage).toBeInTheDocument();

        await waitFor(async () => {
            const titleElement = await screen.findByText('Login', { selector: 'h2' })
            const usernameInput = await screen.findByRole('textbox', { name: 'Username' })
            const passwordInput = await screen.findByLabelText('Password')
            const loginBtn = await screen.findByRole('button', { name: 'Login' });

            expect(titleElement).toBeInTheDocument()
            expect(usernameInput).toBeInTheDocument()
            expect(passwordInput).toBeInTheDocument()
            expect(loginBtn).toBeInTheDocument()
        });
    });
    it('Happy path', async () => {
        const titleElement = await screen.findByText('Login', { selector: 'h2' })
        const usernameInput = await screen.findByRole('textbox', { name: 'Username' })
        const passwordInput = await screen.findByLabelText('Password')
        const loginBtn = await screen.findByRole('button', { name: 'Login' });

        expect(titleElement).toBeInTheDocument()
        expect(usernameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(loginBtn).toBeInTheDocument()

        await userEvent.type(usernameInput, 'peter')
        await userEvent.type(passwordInput, '123456');
        await userEvent.click(loginBtn);

        const errorMessage = screen.queryByText("Invalid username/password");
        expect(errorMessage).not.toBeInTheDocument();

    });

})
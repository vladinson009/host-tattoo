import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "../App";

describe('App', () => {
    beforeEach(() => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </QueryClientProvider>
        )
    })
    describe('Load navigation pages correctly', function () {
        it('Home page', async () => {
            const logoElement = screen.getByText('Where dark art meets skin. Book your session with our world-class tattoo artists in Moss.')
            const newsFeedElement = screen.getByText('News feed')
            const galleryElement = screen.getByText('Gallery')
            const artistElement = screen.getByText('Artists')

            expect(logoElement).toBeInTheDocument();
            expect(newsFeedElement).toBeInTheDocument();
            expect(galleryElement).toBeInTheDocument();
            expect(artistElement).toBeInTheDocument();
        });
        it('News feed page', async () => {
            const newsFeedLink = screen.getByRole('link', { name: 'News feed' });
            await userEvent.click(newsFeedLink);

            const titleElement = await screen.findByText('News Feed', { selector: 'h2' })
            expect(titleElement).toBeInTheDocument()
        });
        it('Gallery page', async () => {
            const galleryLink = screen.getByRole('link', { name: 'Gallery' });
            await userEvent.click(galleryLink);

            const titleElement = await screen.findByText('Our Tattoo Gallery', { selector: 'h2' })
            const placeholderElement = await screen.findByPlaceholderText('Search by Tattoo name...');

            expect(titleElement).toBeInTheDocument()
            expect(placeholderElement.placeholder).toEqual('Search by Tattoo name...');
        });
        it('Artists page', async () => {
            const artistsLink = screen.getByRole('link', { name: 'Artists' });
            await userEvent.click(artistsLink);

            const titleElement = await screen.findByText('Our Tattoo Artists', { selector: 'h2' })
            expect(titleElement).toBeInTheDocument()
        });
        it('Login page', async () => {
            const loginLink = screen.getByRole('link', { name: 'Login' });
            await userEvent.click(loginLink);

            const titleElement = await screen.findByText('Login', { selector: 'h2' })
            const passwordInput = await screen.findByLabelText('Password')
            expect(titleElement).toBeInTheDocument()
            expect(passwordInput).toBeInTheDocument()
        });
        it('Register page', async () => {
            const RegisterLink = screen.getByRole('link', { name: 'Register' });
            await userEvent.click(RegisterLink);

            const titleElement = await screen.findByText('Register', { selector: 'h2' })
            const passwordInput = await screen.findByLabelText('Email')
            expect(titleElement).toBeInTheDocument()
            expect(passwordInput).toBeInTheDocument()
        });
    })
    describe('Navigate to components', () => {
        it('navigate to tattoo details', async () => {
            const galleryLink = screen.getByRole('link', { name: 'Gallery' });
            await userEvent.click(galleryLink);

            const titleElement = await screen.findByText('Our Tattoo Gallery', { selector: 'h2' })
            const placeholderElement = await screen.findByPlaceholderText('Search by Tattoo name...');

            expect(titleElement).toBeInTheDocument()
            expect(placeholderElement.placeholder).toEqual('Search by Tattoo name...');

            const tattooImage = await screen.findAllByRole('img');
            const tattooLink = tattooImage[0].closest('a');
            if (tattooLink) {
                await userEvent.click(tattooLink);
                await waitFor(() => {
                    expect(screen.getByText('Tattoo Details')).toBeInTheDocument();
                    expect(screen.getByText('Price:')).toBeInTheDocument();
                });
            }

        });
        it('navigate to artist details', async () => {
            const artistsLink = screen.getByRole('link', { name: 'Artists' });
            await userEvent.click(artistsLink);

            const titleElement = await screen.findByText('Our Tattoo Artists', { selector: 'h2' })
            const infoBtn = await screen.findAllByRole('img');
            const artistDetails = infoBtn[0].parentElement.parentElement.children[1].children[1]

            expect(titleElement).toBeInTheDocument()

            if (artistDetails) {
                await userEvent.click(artistDetails);
                await waitFor(() => {
                    expect(screen.getByText('Tattoo Portfolio')).toBeInTheDocument();
                })
            }
        })
    })
})

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";

import DashboardPage from "./features/dashboard/pages/DashboardPage";
import CreateInterviewPage from "./features/interviews/pages/CreateInterviewPage";
import InterviewSessionPage from "./features/interviews/pages/InterviewSessionPage";
import BookmarksPage from "./features/bookmarks/pages/BookmarksPage";
import ProfilePage from "./features/profile/pages/ProfilePage";

import AppLayout from "./layouts/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / marketing routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Logged-in app routes, nested under the shared AppLayout shell.
            Route protection (redirect-if-not-logged-in) gets added in
            Part 4 once AuthContext exists — this just proves the nesting works. */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/interviews/create" element={<CreateInterviewPage />} />
          <Route path="/interviews/:sessionId/session" element={<InterviewSessionPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
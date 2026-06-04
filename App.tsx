import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';

// Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { UploadNotes } from './pages/UploadNotes';
import { AIQuizGeneration } from './pages/AIQuizGeneration';
import { QuizAttempt } from './pages/QuizAttempt';
import { Results } from './pages/Results';
import { Analytics } from './pages/Analytics';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Main platform routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Layout>
                  <UploadNotes />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate-quiz"
            element={
              <ProtectedRoute>
                <Layout>
                  <AIQuizGeneration />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <QuizAttempt />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/results/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <Results />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Layout>
                  <Analytics />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Leaderboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

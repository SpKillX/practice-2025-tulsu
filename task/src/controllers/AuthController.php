<?php
namespace App\Controllers;

use App\Models\AuthModel;

class AuthController {
    private $authModel;

    public function __construct() {
        $this->authModel = new AuthModel();
    }

    public function login() {
        header('Content-Type: application/json; charset=utf-8');
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['email']) || !isset($data['password'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing email or password']);
                return;
            }

            $user = $this->authModel->login($data['email'], $data['password']);
            if ($user) {
                http_response_code(200);
                echo json_encode(['message' => 'Login successful', 'user' => $user]);
            } else {
                http_response_code(401);
                echo json_encode(['error' => 'Invalid email or password']);
            }
        } catch (\Exception $e) {
            error_log('AuthController: Login error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
        }
    }

    public function register() {
        header('Content-Type: application/json; charset=utf-8');
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['full_name']) || !isset($data['email']) || !isset($data['phone']) || !isset($data['password'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields']);
                return;
            }

            $success = $this->authModel->register(
                $data['full_name'],
                $data['email'],
                $data['phone'],
                $data['password']
            );
            if ($success) {
                http_response_code(201);
                echo json_encode(['message' => 'Registration successful']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to register user']);
            }
        } catch (\Exception $e) {
            error_log('AuthController: Registration error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function requestPasswordReset() {
        header('Content-Type: application/json; charset=utf-8');
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['email'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing email']);
                return;
            }

            $token = $this->authModel->requestPasswordReset($data['email']);
            http_response_code(200);
            echo json_encode(['message' => 'Reset code sent (check logs for code)', 'code' => $token]);
        } catch (\Exception $e) {
            error_log('AuthController: Password reset request error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function verifyResetCode() {
        header('Content-Type: application/json; charset=utf-8');
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['email']) || !isset($data['code'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing email or code']);
                return;
            }

            $success = $this->authModel->verifyResetCode($data['email'], $data['code']);
            if ($success) {
                http_response_code(200);
                echo json_encode(['message' => 'Code verified']);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid or expired code']);
            }
        } catch (\Exception $e) {
            error_log('AuthController: Code verification error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function resetPassword() {
        header('Content-Type: application/json; charset=utf-8');
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['email']) || !isset($data['password'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing email or password']);
                return;
            }

            $success = $this->authModel->resetPassword($data['email'], $data['password']);
            if ($success) {
                http_response_code(200);
                echo json_encode(['message' => 'Password reset successful']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to reset password']);
            }
        } catch (\Exception $e) {
            error_log('AuthController: Password reset error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
?>
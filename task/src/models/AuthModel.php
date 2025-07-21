<?php
namespace App\Models;

use App\config\Database;
use PDO;
use PDOException;

class AuthModel {
    private $db;

    public function __construct() {
        try {
            $this->db = (new Database())->getConnection();
            error_log('AuthModel: Database connection established');
        } catch (PDOException $e) {
            error_log('AuthModel: Database connection failed: ' . $e->getMessage());
            throw new PDOException('Database connection failed');
        }
    }

    public function register($full_name, $email, $phone, $password) {
        try {
            $query = "INSERT INTO users (full_name, email, phone, password, created_at) VALUES (:full_name, :email, :phone, :password, :created_at)";
            $stmt = $this->db->prepare($query);
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt->execute([
                ':full_name' => $full_name,
                ':email' => $email,
                ':phone' => $phone,
                ':password' => $hashedPassword,
                ':created_at' => date('Y-m-d H:i:s')
            ]);
            error_log('AuthModel: User registered: ' . $email);
            return true;
        } catch (PDOException $e) {
            error_log('AuthModel: Failed to register user: ' . $e->getMessage());
            if (strpos($e->getMessage(), 'unique constraint') !== false) {
                throw new \Exception('Email already exists');
            }
            throw new \Exception('Database error: ' . $e->getMessage());
        }
    }

    public function login($email, $password) {
        try {
            $query = "SELECT user_id, full_name, email, password FROM users WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->execute([':email' => $email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                error_log('AuthModel: Login successful for: ' . $email);
                unset($user['password']);
                return $user;
            }
            error_log('AuthModel: Invalid login attempt for: ' . $email);
            return false;
        } catch (PDOException $e) {
            error_log('AuthModel: Failed to login: ' . $e->getMessage());
            throw new \Exception('Database error: ' . $e->getMessage());
        }
    }

    public function requestPasswordReset($email) {
        try {
            $query = "SELECT user_id FROM users WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->execute([':email' => $email]);
            if (!$stmt->fetch(PDO::FETCH_ASSOC)) {
                error_log('AuthModel: Email not found for password reset: ' . $email);
                throw new \Exception('Email not found');
            }

            $token = sprintf("%06d", mt_rand(100000, 999999));
            $expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));

            $query = "UPDATE users SET reset_token = :token, reset_expiry = :expiry WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->execute([
                ':token' => $token,
                ':expiry' => $expiry,
                ':email' => $email
            ]);

            error_log('AuthModel: Password reset token generated for ' . $email . ': ' . $token);
            return $token;
        } catch (PDOException $e) {
            error_log('AuthModel: Failed to request password reset: ' . $e->getMessage());
            throw new \Exception('Database error: ' . $e->getMessage());
        }
    }

    public function verifyResetCode($email, $code) {
        try {
            $query = "SELECT reset_token, reset_expiry FROM users WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->execute([':email' => $email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                error_log('AuthModel: Email not found for code verification: ' . $email);
                throw new \Exception('Email not found');
            }

            if ($user['reset_token'] !== $code) {
                error_log('AuthModel: Invalid reset code for ' . $email);
                throw new \Exception('Invalid code');
            }

            if (strtotime($user['reset_expiry']) < time()) {
                error_log('AuthModel: Expired reset code for ' . $email);
                throw new \Exception('Code expired');
            }

            error_log('AuthModel: Reset code verified for ' . $email);
            return true;
        } catch (PDOException $e) {
            error_log('AuthModel: Failed to verify reset code: ' . $e->getMessage());
            throw new \Exception('Database error: ' . $e->getMessage());
        }
    }

    public function resetPassword($email, $password) {
        try {
            $query = "UPDATE users SET password = :password, reset_token = NULL, reset_expiry = NULL WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt->execute([
                ':password' => $hashedPassword,
                ':email' => $email
            ]);
            error_log('AuthModel: Password reset for ' . $email);
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            error_log('AuthModel: Failed to reset password: ' . $e->getMessage());
            throw new \Exception('Database error: ' . $e->getMessage());
        }
    }
}
?>
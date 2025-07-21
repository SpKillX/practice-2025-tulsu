<?php
namespace App\Controllers;

use App\Models\BookingModel;

class BookingController {
    private $bookingModel;

    public function __construct() {
        $this->bookingModel = new BookingModel();
    }

    public function createBooking() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['name'], $data['email'], $data['phone'], $data['people'], $data['date'], $data['time'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
            return;
        }

        // Basic validation
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email format']);
            return;
        }
        if (!preg_match('/^\+?\d{10,15}$/', $data['phone'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid phone number']);
            return;
        }
        if ($data['people'] < 1 || $data['people'] > 5) {
            http_response_code(400);
            echo json_encode(['error' => 'Number of people must be between 1 and 5']);
            return;
        }
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $data['date'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid date format']);
            return;
        }
        if (!preg_match('/^(?:[0-1][0-9]|2[0-3]):[0-5][0-9]$/', $data['time'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid time format']);
            return;
        }

        $success = $this->bookingModel->createBooking(
            $data['name'],
            $data['email'],
            $data['phone'],
            $data['people'],
            $data['date'],
            $data['time']
        );

        if ($success) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create booking']);
        }
    }
}
?>
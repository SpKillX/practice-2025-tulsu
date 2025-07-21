<?php
namespace App\Controllers;

use App\Models\ContactModel;

class ContactController {
    private $contactModel;

    public function __construct() {
        $this->contactModel = new ContactModel();
    }

    public function createContact() {
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['name']) || empty(trim($data['name']))) {
            http_response_code(400);
            echo json_encode(['error' => 'Имя обязательно для заполнения']);
            return;
        }
        if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Требуется действительный email']);
            return;
        }
        if (!isset($data['phone']) || !preg_match('/^\+?\d{10,15}$/', $data['phone'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Требуется действительный номер телефона']);
            return;
        }
        if (!isset($data['message']) || empty(trim($data['message']))) {
            http_response_code(400);
            echo json_encode(['error' => 'Сообщение обязательно для заполнения']);
            return;
        }

        try {
            $success = $this->contactModel->createContact(
                $data['name'],
                $data['email'],
                $data['phone'],
                $data['message']
            );

            if ($success) {
                http_response_code(201);
                echo json_encode(['message' => 'Сообщение успешно отправлено']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Не удалось сохранить сообщение']);
            }
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Ошибка сервера: ' . $e->getMessage()]);
        }
    }
}
?>
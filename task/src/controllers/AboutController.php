<?php
namespace App\Controllers;

use App\Models\About;

class AboutController {
    private $aboutModel;

    public function __construct() {
        $this->aboutModel = new About();
    }

    public function getAbout() {
        header('Content-Type: application/json');
        echo json_encode($this->aboutModel->getAboutContent());
    }

    public function updateAbout() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['title'], $data['subtitle'], $data['text'], $data['image'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
            return;
        }

        $success = $this->aboutModel->updateAboutContent(
            $data['title'],
            $data['subtitle'],
            $data['text'],
            $data['image']
        );

        if ($success) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update']);
        }
    }
}
?>
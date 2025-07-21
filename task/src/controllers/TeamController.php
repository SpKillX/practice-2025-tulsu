<?php
namespace App\Controllers;

use App\Models\TeamModel;

class TeamController {
    private $teamModel;

    public function __construct() {
        $this->teamModel = new TeamModel();
    }

    public function getTeam() {
        header('Content-Type: application/json');
        try {
            $data = $this->teamModel->getTeamData();
            error_log('TeamController: Sending team data: ' . print_r($data, true));
            http_response_code(200);
            echo json_encode($data);
        } catch (\Exception $e) {
            error_log('TeamController: Failed to fetch team data: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch team data: ' . $e->getMessage()]);
        }
    }

    public function updateTeam() {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['title']) || !isset($data['subtitle']) || !isset($data['text']) || !isset($data['image'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            return;
        }

        try {
            $success = $this->teamModel->updateTeamData(
                $data['title'],
                $data['subtitle'],
                $data['text'],
                $data['image']
            );
            if ($success) {
                http_response_code(200);
                echo json_encode(['message' => 'Team data updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update team data']);
            }
        } catch (\Exception $e) {
            error_log('TeamController: Failed to update team data: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
        }
    }
}
?>
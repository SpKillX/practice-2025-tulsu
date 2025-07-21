<?php
namespace App\Models;

use App\config\Database;
use PDO;
use PDOException;

class TeamModel {
    private $db;

    public function __construct() {
        try {
            $this->db = (new Database())->getConnection();
            error_log('TeamModel: Database connection established');
        } catch (PDOException $e) {
            error_log('TeamModel: Database connection failed: ' . $e->getMessage());
            throw new PDOException('Database connection failed');
        }
    }

    public function getTeamData() {
        try {
            $query = "SELECT title, subtitle, text, image FROM our_team WHERE team_id = 5";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$result) {
                error_log('TeamModel: No data found for team_id = 1, returning fallback');
                return [
                    'title' => 'Master Chef',
                    'subtitle' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
                    'text' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quidem quis necessitatibus nostrum voluptatem natus pariatur in.',
                    'image' => 'https://cms.copp51.ru/uploads/male_chef_cutting_tomatoes_in_the_kitchen_c96fe8fca0.jpg'
                ];
            }
            error_log('TeamModel: Fetched team data: ' . print_r($result, true));
            return $result;
        } catch (PDOException $e) {
            error_log('TeamModel: Failed to fetch team data: ' . $e->getMessage());
            return [
                'title' => 'Master Chef',
                'subtitle' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
                'text' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quidem quis necessitatibus nostrum voluptatem natus pariatur in.',
                'image' => 'https://cms.copp51.ru/uploads/male_chef_cutting_tomatoes_in_the_kitchen_c96fe8fca0.jpg'
            ];
        }
    }

    public function updateTeamData($title, $subtitle, $text, $image) {
        try {
            $query = "UPDATE our_team SET title = :title, subtitle = :subtitle, text = :text, image = :image WHERE team_id = 1";
            $stmt = $this->db->prepare($query);
            $stmt->execute([
                ':title' => $title,
                ':subtitle' => $subtitle,
                ':text' => $text,
                ':image' => $image
            ]);
            error_log('TeamModel: Updated team data, rows affected: ' . $stmt->rowCount());
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            error_log('TeamModel: Failed to update team data: ' . $e->getMessage());
            return false;
        }
    }
}
?>
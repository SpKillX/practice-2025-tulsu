<?php
namespace App\Models;

use App\config\Database;
use PDO;
use PDOException;

class EventsModel {
    private $db;

    public function __construct() {
        try {
            $this->db = (new Database())->getConnection();
            error_log('EventsModel: Database connection established');
        } catch (PDOException $e) {
            error_log('EventsModel: Database connection failed: ' . $e->getMessage());
            throw new PDOException('Database connection failed');
        }
    }

    public function getEvents() {
        try {
            $query = "SELECT event_id, title, subtitle, text, image FROM private_events ORDER BY event_id";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
            error_log('EventsModel: Fetched ' . count($events) . ' events');
            return $events;
        } catch (PDOException $e) {
            error_log('EventsModel: Failed to fetch events: ' . $e->getMessage());
            throw new \Exception('Database error: ' . $e->getMessage());
        }
    }
}
?>
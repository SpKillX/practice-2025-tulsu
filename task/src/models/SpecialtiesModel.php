<?php
namespace App\Models;

use App\config\Database;
use PDO;

class SpecialtiesModel {
    private $db;

    public function __construct() {
        $this->db = (new Database())->getConnection();
    }

    public function getSpecialtiesContent() {
        $query = "SELECT * FROM specialties ORDER BY specialty_id";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
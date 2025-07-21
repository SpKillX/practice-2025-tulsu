<?php
namespace App\Models;

use App\config\Database;
use PDO;

class About {
    private $db;

    public function __construct() {
        $this->db = (new Database())->getConnection();
    }

    public function getAboutContent() {
        $query = "SELECT * FROM about_us WHERE about_id = 1"; 
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateAboutContent($title, $subtitle, $text, $image) {
        $query = "UPDATE about_us SET title = :title, subtitle = :subtitle, text = :text, image = :image WHERE about_id = 1";
        $stmt = $this->db->prepare($query);
        $stmt->execute([
            ':title' => $title,
            ':subtitle' => $subtitle,
            ':text' => $text,
            ':image' => $image
        ]);
        return $stmt->rowCount() > 0;
    }
}
?>
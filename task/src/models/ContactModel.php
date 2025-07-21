<?php
namespace App\Models;

use App\config\Database;
use PDO;

class ContactModel {
    private $db;

    public function __construct() {
        $this->db = (new Database())->getConnection();
    }

    public function createContact($name, $email, $phone, $message) {
        $query = "INSERT INTO contact (name, email, phone, message) VALUES (:name, :email, :phone, :message)";
        $stmt = $this->db->prepare($query);
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone,
            ':message' => $message
        ]);
        return $stmt->rowCount() > 0;
    }
}
?>
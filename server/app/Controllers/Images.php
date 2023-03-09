<?php

namespace App\Controllers;

class Images extends BaseController
{
    public function index()
    {
        $filename = "/path/to/file.jpg"; //<-- specify the image  file
        if (file_exists($filename)) {
            $mime = mime_content_type($filename); //<-- detect file type
            header('Content-Length: ' . filesize($filename)); //<-- sends filesize header
            header("Content-Type: $mime"); //<-- send mime-type header
            header('Content-Disposition: inline; filename="' . $filename . '";'); //<-- sends filename header
            readfile($filename); //<--reads and outputs the file onto the output buffer
        }
        return view('welcome_message');
    }
}

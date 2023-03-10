<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\BarangModel;

class Barang extends ResourceController
{
    /**
     * cek email sudah terdaftar di dalam tabel masyarakat atau belum
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $id =  $this->request->getVar('id');
        $status =  $this->request->getVar('status');
        $model = new BarangModel();
        $barang = $model->where('id_user', $id)->findAll();
        // $barang = $model->getWhere(['id_user' => $id])->getResult();

        // foreach ($barang as $value) {
        //     echo "$value <br>";
        //   }

        return $this->response->setJSON([
            'success' => true,
            'message' => '',
            'data' => $barang
        ]);

        // return $this->respond($barang, 200);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        //
    }

    /**
     *
     * @return mixed
     */
    public function add()
    {
        helper(['form', 'url']);
        $id =  $this->request->getVar('id');
        $model = new BarangModel();

        if ($file = $this->request->getFile('foto')) {
            $validationSize = $this->validate([
                'foto' => 'uploaded[foto]|max_size[foto,100]',
            ]);

            $validationImage = $this->validate([
                'foto' => 'uploaded[foto]|is_image[foto]',
            ]);

            if (!$validationSize) {
                return $this->response->setJSON([
                    'success' => false,
                    'message' => 'Size foto tidak boleh lebih dari 100kb'
                ]);
            } else if (!$validationImage) {
                return $this->response->setJSON([
                    'success' => false,
                    'message' => 'Pastikan yang diupload adalah gambar/foto'
                ]);
            } else {
                $newName = $file->getRandomName();
                $file->move('../public/uploads/barang', $newName);

                $insertdata = [
                    'nama_barang' => $this->request->getVar('nama'),
                    'harga_awal' => $this->request->getVar('harga_awal'),
                    'deskripsi' => $this->request->getVar('deskripsi'),
                    'sistem_bid' => $this->request->getVar('sistem'),
                    'foto' => $newName,
                    'id_user' => $id
                ];

                $model->save($insertdata);

                $response = [
                    'success' => true,
                    'message' => 'Berhasil menambahkan barang'
                ];
                return $this->respond($response);
            }
        } else {
            return $this->response->setJSON([
                'success' => false,
                'message' => 'Pastikan yang diupload adalah gambar/foto'
            ]);
        }
    }


    /**
     * Return the editable properties of a resource object
     *
     * @return mixed
     */
    public function edit($id = null)
    {
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        //
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        //
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function foto()
    {
        $model = new BarangModel();
        $id = $this->request->getVar('id');
        $barang  = $model->where('id_barang', $id)->first();
        $filename = "../public/uploads/barang/" . $barang['foto']; //<-- specify the image  file
        if (file_exists($filename)) {
            $mime = mime_content_type($filename); //<-- detect file type
            header('Content-Length: ' . filesize($filename)); //<-- sends filesize header
            header("Content-Type: $mime"); //<-- send mime-type header
            header('Content-Disposition: inline; filename="' . $filename . '";'); //<-- sends filename header
            readfile($filename); //<--reads and outputs the file onto the output buffer
        }
    }
}

<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\MasyarakatModel;

class Masyarakat extends ResourceController
{
    /**
     * cek email sudah terdaftar di dalam tabel masyarakat atau belum
     *
     * @return mixed
     */
    public function index()
    {
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
     * @return mixed
     */
    public function check()
    {
        helper(['form']);
        $rules = [
            'email' => 'required|is_unique[tb_masyarakat.email]',
        ];
        if (!$this->validate($rules)) {
            return $this->respond([
                'success' => false,
                'message' => 'Email sudah terdaftar, gunakan email lain'
            ]);
        } else {
            // $data = [
            //     'email' => $this->request->getVar('email'),
            // ];
            // $model = new MasyarakatModel();
            // $model->save($data);
            $response = [
                'success' => true,
                'message' => ''
            ];
            return $this->respond($response);
        }
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    use ResponseTrait;
    public function create()
    {
        helper(['form']);

        $rules = [
            'username' => 'required|is_unique[tb_masyarakat.username]',
        ];

        $rules1 = [
            'telp' => 'required|is_unique[tb_masyarakat.telp]',
        ];

        if (!$this->validate($rules)) {
            return $this->respond([
                'success' => false,
                'message' => 'Username sudah dipakai'
            ]);
        } else if (!$this->validate($rules1)) {
            return $this->respond([
                'success' => false,
                'message' => 'No Hp sudah terdaftar'
            ]);
        } else {
            $data = [
                'nama_lengkap' => $this->request->getVar('nama_lengkap'),
                'username' => $this->request->getVar('username'),
                'password' => $this->request->getVar('password'),
                'telp' => $this->request->getVar('telp'),
                'email' => $this->request->getVar('email'),
                'jenis_kelamin' => $this->request->getVar('jk'),
                'foto' => $this->request->getVar('foto')
            ];
            $model = new MasyarakatModel();
            $model->save($data);
            $user  = $model->where('username', $this->request->getVar('username'))->first();
            $response = [
                'success' => true,
                'message' => '',
                'data' => [
                    'id' => intval($user['id_user']),
                    'nama_lengkap' => $user['nama_lengkap'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'telp' => $user['telp'],
                    'gender' => $user['jenis_kelamin']
                ]
            ];
            return $this->respond($response);
        }
    }

    /**
     * login tb_masyarakat
     *
     * @return mixed
     */
    public function login()
    {
        helper(['form']);
        $model = new MasyarakatModel();
        $username = $this->request->getVar('username');
        $user  = $model->where('username', $username)->first();

        if ($user) {
            if ($this->request->getVar('password') === $user['password']) {
                return $this->response->setJSON([
                    'success' => true,
                    'message' => '',
                    'data' => [
                        'id' => intval($user['id_user']),
                        'nama_lengkap' => $user['nama_lengkap'],
                        'username' => $user['username'],
                        'email' => $user['email'],
                        'telp' => $user['telp'],
                        'gender' => $user['jenis_kelamin']
                    ]
                ]);
            } else {
                return $this->respond(
                    [
                        'success' => false,
                        'message' => "Password salah"
                    ]
                );
            }
        } else {
            return $this->respond(
                [
                    'success' => false,
                    'message' => "Username tidak ditemukan"
                ]
            );
        }
    }

    /**
     * Return the editable properties of a resource object
     *
     * @return mixed
     */
    public function edit($id = null)
    {
        //
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
}

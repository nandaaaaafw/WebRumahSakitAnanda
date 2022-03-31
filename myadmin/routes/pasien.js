var express = require("express");
var router = express.Router();
var authentication_mdl = require("../middlewares/authentication");
var session_store;
/* GET Customer page. */

router.get("/", authentication_mdl.is_login, function (req, res, next) {
  req.getConnection(function (err, connection) {
    var query = connection.query(
      "SELECT * FROM data_pasien",
      function (err, rows) {
        if (err) var errornya = ("Error Selecting : %s ", err);
        req.flash("msg_error", errornya);
        res.render("pasien/list", {
          title: "Data Pasien",
          data: rows,
          session_store: req.session,
        });
      }
    );
    //console.log(query.sql);
  });
});

router.delete(
  "/delete/(:id)",
  authentication_mdl.is_login,
  function (req, res, next) {
    req.getConnection(function (err, connection) {
      var data_pasien = {
        id: req.params.id,
      };

      var delete_sql = "delete from data_pasien where ?";
      req.getConnection(function (err, connection) {
        var query = connection.query(
          delete_sql,
          data_pasien,
          function (err, result) {
            if (err) {
              var errors_detail = ("Error Delete : %s ", err);
              req.flash("msg_error", errors_detail);
              res.redirect("/pasien");
            } else {
              req.flash("msg_info", "Delete Data Pasien Success");
              res.redirect("/pasien");
            }
          }
        );
      });
    });
  }
);
router.get(
  "/edit/(:id)",
  authentication_mdl.is_login,
  function (req, res, next) {
    req.getConnection(function (err, connection) {
      var query = connection.query(
        "SELECT * FROM data_pasien where id=" + req.params.id,
        function (err, rows) {
          if (err) {
            var errornya = ("Error Selecting : %s ", err);
            req.flash("msg_error", errors_detail);
            res.redirect("/pasien");
          } else {
            if (rows.length <= 0) {
              req.flash("msg_error", "Pasien tidak ditemukan!");
              res.redirect("/pasien");
            } else {
              console.log(rows);
              res.render("pasien/edit", {
                title: "Edit ",
                data: rows[0],
                session_store: req.session,
              });
            }
          }
        }
      );
    });
  }
);
router.put(
  "/edit/(:id)",
  authentication_mdl.is_login,
  function (req, res, next) {
    req.assert("nama_pasien", "Harap isi Nama!").notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
      v_nama_pasien = req.sanitize("nama_pasien").escape().trim();
      v_jenis_kelamin = req.sanitize("jenis_kelamin").escape().trim();
      v_ruangan = req.sanitize("ruangan").escape().trim();
      v_tgl_masuk = req.sanitize("tgl_masuk").escape().trim();
      v_alamat = req.sanitize("alamat").escape().trim();

      var data_pasien = {
        nama_pasien: v_nama_pasien,
        jenis_kelamin: v_jenis_kelamin,
        ruangan: v_ruangan,
        tgl_masuk: v_tgl_masuk,
        alamat: v_alamat,
      };

      var update_sql = "update data_pasien SET ? where id = " + req.params.id;
      req.getConnection(function (err, connection) {
        var query = connection.query(
          update_sql,
          data_pasien,
          function (err, result) {
            if (err) {
              var errors_detail = ("Error Update : %s ", err);
              req.flash("msg_error", errors_detail);
              res.render("pasien/edit", {
                nama_pasien: req.param("nama_pasien"),
                jenis_kelamin: req.param("jenis_kelamin"),
                ruangan: req.param("ruangan"),
                tgl_masuk: req.param("tgl_masuk"),
                alamat: req.param("alamat"),
              });
            } else {
              req.flash("msg_info", "Update data pasien success");
              res.redirect("/pasien/edit/" + req.params.id);
            }
          }
        );
      });
    } else {
      console.log(errors);
      errors_detail = "<p>Sory there are error</p><ul>";
      for (i in errors) {
        error = errors[i];
        errors_detail += "<li>" + error.msg + "</li>";
      }
      errors_detail += "</ul>";
      req.flash("msg_error", errors_detail);
      res.redirect("/pasien/edit/" + req.params.id);
    }
  }
);

router.post("/add", authentication_mdl.is_login, function (req, res, next) {
  req.assert("nama_pasien", "Harap isi Nama!").notEmpty();
  var errors = req.validationErrors();
  if (!errors) {
    v_nama_pasien = req.sanitize("nama_pasien").escape().trim();
    v_jenis_kelamin = req.sanitize("jenis_kelamin").escape().trim();
    v_ruangan = req.sanitize("ruangan").escape().trim();
    v_tgl_masuk = req.sanitize("tgl_masuk").escape().trim();
    v_alamat = req.sanitize("alamat").escape().trim();

    var data_pasien = {
      nama_pasien: v_nama_pasien,
      jenis_kelamin: v_jenis_kelamin,
      ruangan: v_ruangan,
      tgl_masuk: v_tgl_masuk,
      alamat: v_alamat,
    };

    var insert_sql = "INSERT INTO data_pasien SET ?";
    req.getConnection(function (err, connection) {
      var query = connection.query(
        insert_sql,
        data_pasien,
        function (err, result) {
          if (err) {
            var errors_detail = ("Error Insert : %s ", err);
            req.flash("msg_error", errors_detail);
            res.render("pasien/add-pasien", {
              nama_pasien: req.param("nama_pasien"),
              jenis_kelamin: req.param("jenis_kelamin"),
              ruangan: req.param("ruangan"),
              tgl_masuk: req.param("tgl_masuk"),
              alamat: req.param("alamat"),
              session_store: req.session,
            });
          } else {
            req.flash("msg_info", "Data pasien berhasil ditambahkan!");
            res.redirect("/pasien");
          }
        }
      );
    });
  } else {
    console.log(errors);
    errors_detail = "<p>Sory there are error</p><ul>";
    for (i in errors) {
      error = errors[i];
      errors_detail += "<li>" + error.msg + "</li>";
    }
    errors_detail += "</ul>";
    req.flash("msg_error", errors_detail);
    res.render("pasien/add-pasien", {
      nama_pasien: req.param("nama_pasien"),
      alamat: req.param("alamat"),
      session_store: req.session,
    });
  }
});

router.get("/add", authentication_mdl.is_login, function (req, res, next) {
  res.render("pasien/add-pasien", {
    title: "Tambahkan Pasien",
    nama_pasien: "",
    jenis_kelamin: "",
    ruangan: "",
    tgl_masuk: "",
    alamat: "",
    session_store: req.session,
  });
});

module.exports = router;
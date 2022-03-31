var express = require("express");
var router = express.Router();
var authentication_mdl = require("../middlewares/authentication");
var session_store;
/* GET Customer page. */

router.get("/", authentication_mdl.is_login, function (req, res, next) {
  req.getConnection(function (err, connection) {
    var query = connection.query(
      "SELECT * FROM data_dokter",
      function (err, rows) {
        if (err) var errornya = ("Error Selecting : %s ", err);
        req.flash("msg_error", errornya);
        res.render("dokter/list", {
          title: "Data Dokter",
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
      var data_dokter = {
        id: req.params.id,
      };

      var delete_sql = "delete from data_dokter where ?";
      req.getConnection(function (err, connection) {
        var query = connection.query(
          delete_sql,
          data_dokter,
          function (err, result) {
            if (err) {
              var errors_detail = ("Error Delete : %s ", err);
              req.flash("msg_error", errors_detail);
              res.redirect("/dokter");
            } else {
              req.flash("msg_info", "Delete Data Dokter Success");
              res.redirect("/dokter");
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
        "SELECT * FROM data_dokter where id=" + req.params.id,
        function (err, rows) {
          if (err) {
            var error_detail = ("Error Selecting : %s ", err);
            req.flash("msg_error", errors_detail);
            res.redirect("/dokter");
          } else {
            if (rows.length <= 0) {
              req.flash("msg_error", "Dokter tidak ditemukan!");
              res.redirect("/dokter");
            } else {
              console.log(rows);
              res.render("dokter/edit", {
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
    req.assert("nama_dokter", "Harap isi Nama!").notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
      v_nama_dokter = req.sanitize("nama_dokter").escape().trim();
      v_jenis_kelamin = req.sanitize("jenis_kelamin").escape().trim();
      v_spesialis = req.sanitize("spesialis").escape().trim();
      v_jam_praktik = req.sanitize("jam_praktik").escape();

      var data_dokter = {
        nama_dokter: v_nama_dokter,
        jenis_kelamin: v_jenis_kelamin,
        spesialis: v_spesialis,
        jam_praktik: v_jam_praktik,
    };

      var update_sql = "update data_dokter SET ? where id = " + req.params.id;
      req.getConnection(function (err, connection) {
        var query = connection.query(
          update_sql,
          data_dokter,
          function (err, result) {
            if (err) {
              var errors_detail = ("Error Update : %s ", err);
              req.flash("msg_error", errors_detail);
              res.render("dokter/edit", {
                nama_dokter: req.param("nama_dokter"),
                jenis_kelamin: req.param("jenis_kelamin"),
                spesialis: req.param("spesialis"),
                jam_praktik: req.param("jam_praktik"),
              });
            } else {
              req.flash("msg_info", "Update data dokter success");
              res.redirect("/dokter/edit/" + req.params.id);
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
      res.redirect("/dokter/edit/" + req.params.id);
    }
  }
);

router.post("/add", authentication_mdl.is_login, function (req, res, next) {
  req.assert("nama_dokter", "Harap isi Nama!").notEmpty();
  var errors = req.validationErrors();
  if (!errors) {
    v_nama_dokter = req.sanitize("nama_dokter").escape().trim();
    v_jenis_kelamin = req.sanitize("jenis_kelamin").escape().trim();
    v_spesialis = req.sanitize("spesialis").escape().trim();
    v_jam_praktik = req.sanitize("jam_praktik").escape();
    
    var data_dokter = {
      nama_dokter: v_nama_dokter,
      jenis_kelamin: v_jenis_kelamin,
      spesialis: v_spesialis,
      jam_praktik: v_jam_praktik,
    };

    var insert_sql = "INSERT INTO data_dokter SET ?";
    req.getConnection(function (err, connection) {
      var query = connection.query(
        insert_sql,
        data_dokter,
        function (err, result) {
          if (err) {
            var errors_detail = ("Error Insert : %s ", err);
            req.flash("msg_error", errors_detail);
            res.render("dokter/add-dokter", {
              nama_dokter: req.param("nama_dokter"),
              jenis_kelamin: req.param("jenis_kelamin"),
              spesialis: req.param("spesialis"),
              jam_praktik: req.param("jam_praktik"),
              session_store: req.session,
            });
          } else {
            req.flash("msg_info", "Data dokter berhasil ditambahkan!");
            res.redirect("/dokter");
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
    res.render("dokter/add-dokter", {
      nama_dokter: req.param("nama_dokter"),
      jam_praktik: req.param("jam_praktik"),
      session_store: req.session,
    });
  }
});

router.get("/add", authentication_mdl.is_login, function (req, res, next) {
  res.render("dokter/add-dokter", {
    title: "Tambahkan Dokter",
    nama_dokter: "",
    jenis_kelamin: "",
    spesialis: "",
    jam_praktik: "",
    session_store: req.session,
  });
});

module.exports = router;
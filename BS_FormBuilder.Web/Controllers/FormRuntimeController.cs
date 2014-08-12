using BS_FormBuilder.Web.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace BS_FormBuilder.Web.Controllers
{
    public class FormRuntimeController : Controller
    {
        private FormBuilderContext db = new FormBuilderContext();

        // GET: /FormBuilder/Edit/5
        public ActionResult Edit(int? id) {
            ViewBag.EditMode = "edit";
            if (id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Form form = db.Forms.Find(id);
            if (form == null) {
                return HttpNotFound();
            }
            return View(form);
        }

        // POST: /FormBuilder/Edit/5  ...ToDo awaiting Arnabs call
        [HttpPost]
        public ActionResult Edit(int id) {
            return RedirectToAction("Edit", new {id = id});
        }

    }
}
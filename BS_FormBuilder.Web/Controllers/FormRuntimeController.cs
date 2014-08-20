using BS_FormBuilder.Web.Helpers;
using BS_FormBuilder.Web.Models.Entities;
using Newtonsoft.Json;
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
        private static string DefaultViewName = "Run";

        private FormBuilderContext db = new FormBuilderContext();

        // GET: /FormRuntime/Run/5
        public ActionResult Run(int formId) {
            Form form = db.Forms.Find(formId);
            if (form == null) {
                return HttpNotFound();
            }
            string viewName = DefaultViewName;
            return View(viewName,form);
        }

        public ActionResult RunData(int formId) {
            Form form = db.Forms.Find(formId);
            if (form == null) {
                return HttpNotFound();
            }
            return new JsonCamelCaseResult(form, JsonRequestBehavior.AllowGet);
        }
        
        // POST: /FormRuntime/Run/5  ...ToDo awaiting Arnabs call
        [HttpPost]
        public ActionResult Run(Form form) {
            return RedirectToAction("Run", new {formId = form.FormId});
        }

    }
}
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
        private static string ModalViewName = "RunModal";
        private static string RunModalBottomPop = "RunModalBottomPop";
        private static string RunModalSidePop = "RunModalSidePop";

        private FormBuilderContext db = new FormBuilderContext();

        // GET: /FormRuntime/Run/5
        public ActionResult Run(int formId) {
            Form form = db.Forms.Find(formId);
            if (form == null) {
                return HttpNotFound();
            }
            string viewName = DefaultViewName;
            //switch (form.FormDisplayStyle) {
            //    case FormDisplayStyle.Non_Modal:
            //        viewName = DefaultViewName;
            //        break;
            //    case FormDisplayStyle.Slide_From_Top:
            //        viewName = ModalViewName;
            //        break;
            //    case FormDisplayStyle.Slide_From_Bottom_Right:
            //        viewName = RunModalBottomPop;
            //        break;
            //    case FormDisplayStyle.Slide_From_Side:
            //        viewName = RunModalSidePop;
            //        break;
            //    default:
            //        viewName = DefaultViewName;
            //        break;
            //}
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
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using BS_FormBuilder.Web.Models.Entities;
using System.Threading;
using BS_FormBuilder.Web.Models.ViewModels;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;

namespace BS_FormBuilder.Web.Controllers
{
    public class FormBuilderController : Controller {
        private FormBuilderContext db = new FormBuilderContext();

        // GET: /FormBuilder/
        public ActionResult List() {
            return View(db.Forms.ToList());
        }

        public ActionResult Create() {
            Form form = new Form() {
                FormName = "Form Name",
                FormJson = DefaultFormJson(),
                FormBuilderJson = DefaultFormBuilderJson(),
                Guid = Guid.NewGuid(),
                CreatedOn = DateTime.Now
            };
            db.Forms.Add(form);
            db.SaveChanges();
            return RedirectToAction("EditAttributes", new {formId = form.FormId});
        }

        // GET: /FormBuilder/Edit/5
        public ActionResult Edit(int? formId) {
            ViewBag.EditMode = "edit";
            if (formId == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Form form = db.Forms.Find(formId);
            if (form == null) {
                return HttpNotFound();
            }
            return View(form);
        }

        // POST: /FormBuilder/Edit
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Form form) {
            ViewBag.EditMode = "edit";

            string duplicateId = HasDuplicateIds(form.FormJson);
            if (string.IsNullOrEmpty(duplicateId)) {
                if (ModelState.IsValid) {
                    Form dbForm = db.Forms.Where(f => f.FormId == form.FormId).SingleOrDefault();
                    if (dbForm != null) {
                        dbForm.FormName = form.FormName;
                        dbForm.FormJson = form.FormJson;
                        dbForm.FormBuilderJson = form.FormBuilderJson;
                        dbForm.UpdatedOn = DateTime.Now;
                        //ToDo                    dbForm.RowVersion = form.RowVersion;
                        db.SaveChanges();
                        return Json(string.Empty);
                    }
                    else {
                        return new HttpStatusCodeResult(HttpStatusCode.NotFound);
                    }
                }
            }
            else {
                var errorMessage = string.Format(Messages.DuplicateIdsInForm, duplicateId);
                return Json(new { result = "Error", errorMessage = errorMessage });
            }
            return View(form);
        }

        // GET: /FormBuilder/Delete/5
        public ActionResult Delete(int? formId) {
            if (formId == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Form form = db.Forms.Find(formId);
            if (form == null) {
                return HttpNotFound();
            }
            db.Forms.Remove(form);
            db.SaveChanges();
            return RedirectToAction("List");
        }

        // GET: /FormBuilder/EditFormAttributes/5
        [HttpGet]
        public ActionResult EditAttributes(int formId) {
            Form form = db.Forms.Find(formId);
            if (form == null) {
                return HttpNotFound();
            }
            FormAttributeViewModel viewModel = new FormAttributeViewModel() { 
                FormId = form.FormId, 
                FormDisplayStyle = form.FormDisplayStyle 
            };
            return View(form);
        }

        // POST: /FormBuilder/EditAttributes
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditAttributes(Form form, string submitButton) {
            Form dbForm = db.Forms.Where(f => f.FormId == form.FormId).SingleOrDefault();
            if (dbForm != null) {
                dbForm.FormDisplayStyle = form.FormDisplayStyle;
                dbForm.OpenDialogBtnBackground = form.OpenDialogBtnBackground;
                dbForm.OpenDialogBtnForeground = form.OpenDialogBtnForeground;
                dbForm.OpenDialogBtnFont = form.OpenDialogBtnFont;
                dbForm.OpenDialogBtnFontSize = form.OpenDialogBtnFontSize;
                dbForm.OpenDialogBtnPosition = form.OpenDialogBtnPosition;
                dbForm.RowVersion = form.RowVersion;
                dbForm.UpdatedOn = DateTime.Now;
                db.SaveChanges();

                if (submitButton.Equals(Messages.EditAttributeSaveAndReturn)) {
                    return RedirectToAction("List");
                }
                else if (submitButton.Equals(Messages.EditAttributeSaveAndBuild)) {
                    return RedirectToAction("Edit", new { formId = form.FormId });
                }
                return RedirectToAction("List");
            }
            return View(form);
        }

        private string HasDuplicateIds(string jsonArray) {
            List<string> idList = new List<string>();
            JArray jArray = JArray.Parse(jsonArray);
            foreach (JObject jObject in jArray) {
                string idToken = (string) jObject.SelectToken("id");
                if (!string.IsNullOrEmpty(idToken)) {
                    idList.Add(idToken);
                }
            }
            var firstDuplicate = idList.GroupBy(id => id, StringComparer.CurrentCultureIgnoreCase)
                                       .Where(group => group.Count() > 1)
                                       .Select(group => group.Key)
                                       .SingleOrDefault();

            if (!string.IsNullOrEmpty(firstDuplicate)) {
                return firstDuplicate;
            }
            return null;
        }

        private string DefaultFormJson() {
            return "[{\"name\":\"Form Name\"}]";
        }

        private string DefaultFormBuilderJson() {
            return "[{\"title\":\"Form Name\",\"fields\":{\"name\":{\"label\":\"Form Name\",\"type\":\"input\",\"value\":\"Form Name\",\"name\":\"name\"}}}]";
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

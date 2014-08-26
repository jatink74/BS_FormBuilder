using BS_FormBuilder.Web.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace BS_FormBuilder.Web.Models.ViewModels {
    
    public class FormAttributeViewModel {

        public int FormId { get; set; }

        public FormDisplayStyle FormDisplayStyle { get; set; }

        [DisplayName("Button Background")]
        public string OpenDialogBtnBackground { get; set; }

        [DisplayName("Button Foreground")]
        public string OpenDialogBtnForeground { get; set; }
    }
}
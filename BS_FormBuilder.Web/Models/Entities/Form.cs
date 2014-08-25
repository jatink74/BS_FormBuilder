using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BS_FormBuilder.Web.Models.Entities {

    public enum FormDisplayStyle {
        [Description("Non Modal(Landing Page)")]
        Non_Modal,
        [Description("Modal Window")]
        Slide_From_Top,
        [Description("Pushup From Bottom")]
        Slide_From_Bottom_Right
        //[Description("Slide From Side")]
        //Slide_From_Side
    }

    public class Form {

        [DisplayName("Form Id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FormId { get; set; }

        public Guid Guid { get; set; }

        [Required(AllowEmptyStrings=false,ErrorMessage="Form Name should be specified")]
        [MaxLength(100, ErrorMessage="Form Name cannot exceed 100 characters")]
        [DisplayName("Form Name")]
        public string FormName { get; set; }

        [DisplayName("Display Style")]
        public FormDisplayStyle FormDisplayStyle { get; set; }

        [Required(AllowEmptyStrings=false, ErrorMessage="Form Json Field Cannot be Blank")]
        public string FormJson { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Form Builder Json Field Cannot be Blank")]
        public string FormBuilderJson { get; set; }

        [DisplayName("Date Created On")]
        public DateTime CreatedOn { get; set; }

        [DisplayName("Date Updated On")]
        public DateTime? UpdatedOn { get; set; }

        public Byte[] RowVersion { get; set; }
    }
}
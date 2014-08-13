using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BS_FormBuilder.Web.Models.Entities {

    public enum FormDisplayType {
        Slide_From_Top,
        Slide_From_Right_Corner,
        Slide_From_Side
    }

    public class Form {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FormId { get; set; }

        [Required(AllowEmptyStrings=false,ErrorMessage="Form Name should be specified")]
        [MaxLength(100, ErrorMessage="Form Name cannot exceed 100 characters")]
        public string FormName { get; set; }

        [Required(AllowEmptyStrings=false, ErrorMessage="Form Json Field Cannot be Blank")]
        public string FormJson { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Form Builder Json Field Cannot be Blank")]
        public string FormBuilderJson { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public Byte[] RowVersion { get; set; }
    }
}
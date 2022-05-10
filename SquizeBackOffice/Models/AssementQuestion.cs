using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Squize.Models
{
    [Table("assestment_questions")]
    public partial class AssesmentQuestion
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Column("ques_id")]
        public int QuestionId { get; set; }
        [Column("ass_id")]
        public int AssesmentId { get; set; }

        [NotMapped]
        public virtual Question Question { get; set; }
        public virtual Assesment Assesment { get; set; }

    }
}

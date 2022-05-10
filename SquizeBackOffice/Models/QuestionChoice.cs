using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Squize.Models
{
    [Table("question_choices")]
    public partial class QuestionChoice
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public short Position { get; set; }
        public string Text { get; set; }
        [Column("que_id")]
        public int QuestionId { get; set; }

        [NotMapped]
        public virtual Question Question { get; set; }

    }
}

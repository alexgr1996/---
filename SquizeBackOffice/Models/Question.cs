using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Squize.Models
{
    [Table("questions")]
    public partial class Question
    {
        public Question()
        {
            QuestionChoices = new HashSet<QuestionChoice>();
            AssesmentQuestions = new HashSet<AssesmentQuestion>();
        }

        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public short Difficulty { get; set; }
        [Column("question_text")] 
        public string QuestionText { get; set; }
        [Column("category_id")]
        public int CategoryId { get; set; }
        [Column("correct_choise_pos")]
        public short CorrectChoicePos { get; set; }

        [NotMapped]
        public virtual Category Category { get; set; }
        public virtual ICollection<QuestionChoice> QuestionChoices { get; set; }
        public virtual ICollection<AssesmentQuestion> AssesmentQuestions { get; set; }


    }
}

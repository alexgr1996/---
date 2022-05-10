using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Squize.Models
{
    [Table("assesment")]
    public partial class Assesment
    {
        public Assesment()
        {
            AssesmentQuestions = new HashSet<AssesmentQuestion>();
        }

        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        [Column("category_id")]
        public int CategoryId { get; set; }

        [NotMapped]
        public virtual Category Category { get; set; }
        public virtual ICollection<AssesmentQuestion> AssesmentQuestions { get; set; }
    }
}

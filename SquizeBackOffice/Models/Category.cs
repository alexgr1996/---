using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Squize.Models
{
    [Table("categories")]
    public partial class Category
    {
        public Category()
        {
            Questions = new HashSet<Question>();
            Assesments = new HashSet<Assesment>();
        }

        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Question> Questions { get; set; }
        public virtual ICollection<Assesment> Assesments { get; set; }
    }
}

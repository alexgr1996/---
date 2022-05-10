using System;
using Squize.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Squize
{
    public partial class SquizeDBContext : DbContext
    {
        public SquizeDBContext()
        {
        }

        public SquizeDBContext(DbContextOptions<SquizeDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<QuestionChoice> QuestionChoice { get; set; }
        public virtual DbSet<Assesment> Assesment { get; set; }
        public virtual DbSet<AssesmentQuestion> AssesmentQuestion { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Question>(entity =>
            {
                entity.ToTable("questions");

                entity.Property(e => e.QuestionText)
                    .HasMaxLength(4000)
                    .IsUnicode(true);

                entity.Property(e => e.Difficulty);

                entity.Property(e => e.CorrectChoicePos);

                entity.Property(e => e.CategoryId);

                entity.Ignore(e => e.Category);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Questions)
                    .HasPrincipalKey(p => p.Id)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.NoAction)
                    .HasConstraintName("que_cate_fk");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("categories");

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .IsUnicode(true);
            });

            modelBuilder.Entity<QuestionChoice>(entity =>
            {
                entity.ToTable("question_choices");

                entity.Property(e => e.Text)
                    .HasMaxLength(200)
                    .IsUnicode(true);

                entity.Property(e => e.Position);

                entity.Property(e => e.QuestionId);

                entity.Ignore(e => e.Question);

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.QuestionChoices)
                    .HasPrincipalKey(p => p.Id)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("que_sc_que_fk");
            });

            modelBuilder.Entity<Assesment>(entity =>
            {
                entity.ToTable("assesment");

                entity.Property(e => e.Title)
                    .HasMaxLength(200)
                    .IsUnicode(true);

                entity.Property(e => e.CategoryId);

                entity.Ignore(e => e.Category);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Assesments)
                    .HasPrincipalKey(p => p.Id)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.NoAction)
                    .HasConstraintName("ass_cat_fk");
            });

            modelBuilder.Entity<AssesmentQuestion>(entity =>
                {
                    entity.ToTable("assestment_questions");

                    entity.Property(e => e.QuestionId);

                    entity.Property(e => e.AssesmentId);

                    entity.Ignore(e => e.Question);

                    entity.Ignore(e => e.Assesment);

                    entity.HasOne(d => d.Question)
                        .WithMany(p => p.AssesmentQuestions)
                        .HasPrincipalKey(p => p.Id)
                        .HasForeignKey(d => d.QuestionId)
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("asse_que_asse_fk");

                    entity.HasOne(d => d.Assesment)
                        .WithMany(p => p.AssesmentQuestions)
                        .HasPrincipalKey(p => p.Id)
                        .HasForeignKey(d => d.AssesmentId)
                        .OnDelete(DeleteBehavior.Cascade)
                        .HasConstraintName("asse_que_que_fk");
                });
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

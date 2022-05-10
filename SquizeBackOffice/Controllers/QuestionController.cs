using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Squize.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Squize.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private SquizeDBContext _context;

        public QuestionController(SquizeDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Question>> Get()
        {
            return await _context.Question
                            .Include(s => s.Category)
                            .Include(s => s.QuestionChoices)
                            .ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Question entity)
        {
            _context.Entry(entity).State = EntityState.Modified;

            foreach (QuestionChoice qc in entity.QuestionChoices)
            {
                _context.Entry(qc).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Question entity)
        {
            _context.Entry(entity).State = EntityState.Added;

            foreach (QuestionChoice qc in entity.QuestionChoices)
            {
                _context.Entry(qc).State = EntityState.Added;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, Question entity)
        {
            _context.Question.Remove(entity);

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}

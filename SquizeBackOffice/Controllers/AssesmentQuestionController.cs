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
    public class AssesmentQuestionController : ControllerBase
    {
        private SquizeDBContext _context;

        public AssesmentQuestionController(SquizeDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<AssesmentQuestion>> Get()
        {
            return await _context.AssesmentQuestion
                            .Include(s => s.Assesment)
                            .Include(s => s.Question)
                            .ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, AssesmentQuestion entity)
        {
            _context.Entry(entity).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Post(AssesmentQuestion entity)
        {
            _context.Entry(entity).State = EntityState.Added;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, AssesmentQuestion entity)
        {
            _context.AssesmentQuestion.Remove(entity);

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}

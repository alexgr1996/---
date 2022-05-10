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
    public class AssesmentController : ControllerBase
    {
        private SquizeDBContext _context;

        public AssesmentController(SquizeDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Assesment>> Get()
        {
            return await _context.Assesment
                            .Include(s => s.Category)
                            .ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Assesment entity)
        {
            _context.Entry(entity).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Assesment entity)
        {
            _context.Entry(entity).State = EntityState.Added;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, Assesment entity)
        {
            _context.Assesment.Remove(entity);

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}

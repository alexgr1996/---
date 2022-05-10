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
    public class CategoryController : ControllerBase
    {
        private SquizeDBContext _context;

        public CategoryController(SquizeDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            return await _context.Category
                            .ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Category entity)
        {
            _context.Entry(entity).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Category entity)
        {
            _context.Entry(entity).State = EntityState.Added;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, Category entity)
        {
            _context.Category.Remove(entity);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

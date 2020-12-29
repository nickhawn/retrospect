using Microsoft.EntityFrameworkCore;
using Retrospect.Data;

namespace Retrospect.EntityFramework.Data
{
    public class RetrospectContext : DbContext
    {
        public RetrospectContext(DbContextOptions<RetrospectContext> options) : base(options)
        {
        }

        public DbSet<Feedback> Feedback { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Feedback>().ToTable("Feedback");
        }
    }
}
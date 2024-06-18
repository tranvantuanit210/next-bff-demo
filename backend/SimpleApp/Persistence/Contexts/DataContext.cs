using Microsoft.EntityFrameworkCore;
using SimpleApp.Domain.Entities.Users;

namespace SimpleApp.Persistence.Contexts;

public sealed class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }
    
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
    }
    
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return SaveChangesAsync(true, cancellationToken);
    }
    
    public override int SaveChanges() => throw new NotImplementedException();
    public override int SaveChanges(bool acceptAllChangesOnSuccess) => throw new NotImplementedException();
}
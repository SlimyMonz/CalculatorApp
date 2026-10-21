using Microsoft.AspNetCore.Diagnostics;

namespace Calculator.Api.Handler;

public class GlobalExceptionHandler(IProblemDetailsService problemDetails) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext context, Exception exception, CancellationToken cancellationToken)
    {
        var (status, title) = exception switch
        {
            DivideByZeroException => (StatusCodes.Status400BadRequest, "Cannot divide by zero"),
            _ => (StatusCodes.Status500InternalServerError, "An unexpected error occurred")
        };

        context.Response.StatusCode = status;

        return await problemDetails.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = context,
            Exception = exception,
            ProblemDetails =
            {
                Status = status,
                Title = title,
                Detail = status < 500 ? exception.Message : null // prevent leaking internal statuses
            }
        });
    }
}
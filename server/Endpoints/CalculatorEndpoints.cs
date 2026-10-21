using Calculator.Api.Models;
using Calculator.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Calculator.Api.Endpoints;

[ApiController]
[Route("api")]
public class CalculatorController(ICalculatorService calc) : ControllerBase
{
    [HttpPost("add")]
    public ActionResult<CalculationResult> Add(CalculationRequest request)
    {
        var result = new CalculationResult("add", request.A, request.B, calc.Add(request.A, request.B));
        return Ok(result);
    }

    [HttpPost("subtract")]
    public ActionResult<CalculationResult> Subtract(CalculationRequest request)
    {
        var result = new CalculationResult("subtract", request.A, request.B, calc.Subtract(request.A, request.B));
        return Ok(result);
    }

    [HttpPost("multiply")]
    public ActionResult<CalculationResult> Multiply(CalculationRequest request)
    {
        var result = new CalculationResult("multiply", request.A, request.B, calc.Multiply(request.A, request.B));
        return Ok(result);
    }

    [HttpPost("divide")]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public ActionResult<CalculationResult> Divide(CalculationRequest r)
    {
        var result = new CalculationResult("divide", r.A, r.B, calc.Divide(r.A, r.B));
        return Ok(result);
    }
}
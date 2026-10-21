using Calculator.Api.Models;
using Calculator.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Calculator.Api.Controllers;

[ApiController]
[Route("api")]
public class CalculatorController(ICalculatorService calc) : ControllerBase
{
    [HttpPost("add")]
    public ActionResult<CalculationResult> Add(CalculationRequest request)
    {
        var result = new CalculationResult(calc.Add(request.A, request.B));
        return Ok(result);
    }

    [HttpPost("subtract")]
    public ActionResult<CalculationResult> Subtract(CalculationRequest request)
    {
        var result = new CalculationResult(calc.Subtract(request.A, request.B));
        return Ok(result);
    }

    [HttpPost("multiply")]
    public ActionResult<CalculationResult> Multiply(CalculationRequest request)
    {
        var result = new CalculationResult(calc.Multiply(request.A, request.B));
        return Ok(result);
    }

    [HttpPost("divide")]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)] // For divide by 0
    public ActionResult<CalculationResult> Divide(CalculationRequest request)
    {
        var result = new CalculationResult(calc.Divide(request.A, request.B));
        return Ok(result);
    }
}
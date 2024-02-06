package Parser;
import Tokenizer.*;
import Statement.*;

public class ProcessParse implements Parser {
    private final Tokenizer tkz;

    public ProcessParse(Tokenizer tkz) {
        this.tkz = tkz;
    }

    // Plan → Statement+

    // Statement →Command | BlockStatement | IfStatement | WhileStatement

    // Command → AssignmentStatement | ActionCommand

    // AssignmentStatement → Expression

    // ActionCommand →done | relocate | MoveCommand | RegionCommand | AttackCommand

    // MoveCommand → move Direction

    // RegionCommand → invest Expression | collect Expression

    // AttackCommand → shoot Direction Expression

    // Direction → up | down | upleft | upright | downleft | downright

    // BlockStatement → { Statement* }

    // IfStatement → if ( Expression ) then Statement else Statement
    private void parseIfStatement() {
        tkz.consume("if");
        tkz.consume("(");
        ExpressionNode expressionNode = parseExpression();
        tkz.consume(")");
        tkz.consume("then");
        ExecuteNode trueStatement = parseStatement();
        tkz.consume("else");
        ExecuteNode falseStatement = parseStatement();
        return new IfStatementNode(expressionNode, trueStatement, falseStatement);
    }

    // WhileStatement →while ( Expression ) Statement

    // Expression → Expression + Term | Expression - Term | Term

    // Term → Term * Factor | Term / Factor | Term % Factor | Factor

    // Factor → Power ^ Factor | Power

    // Power → <number> | <identifier> | ( Expression ) | InfoExpression

    // InfoExpression → opponent | nearby Direction

}

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    @Autowired
    private ExpenseRepository repository;

    @GetMapping
    public List<Expense> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Expense create(@RequestBody Expense expense) {
        return repository.save(expense);
    }
}

@Entity
@Table(name = "expenses")
class Expense {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private Double amount;
    // Getters and Setters omitted for brevity
}

interface ExpenseRepository extends JpaRepository<Expense, Long> {}

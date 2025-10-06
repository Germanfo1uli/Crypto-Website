package cryptoback.server.services;

import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import cryptoback.server.repositories.UserDataRepository;
import cryptoback.server.models.user.UserData;

import java.util.concurrent.CompletableFuture;

@Service
public class UserDataService {
    private final UserDataRepository repository;

    public UserDataService(UserDataRepository repository) {
        this.repository = repository;
    }

    @Async
    @Transactional
    public CompletableFuture<UserData> createUserAsync(UserData user) {
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        return CompletableFuture.completedFuture(repository.save(user));
    }

    @Async
    @Transactional
    public CompletableFuture<UserData> getUserByIdAsync(Long id) {
        return CompletableFuture.completedFuture(repository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found")));
    }

    @Async
    @Transactional
    public CompletableFuture<UserData> updateUserAsync(UserData user) {
        return CompletableFuture.completedFuture(repository.save(user));
    }

    @Async
    @Transactional
    public CompletableFuture<Void> deleteUserAsync(Long id) {
        repository.deleteById(id);
        return CompletableFuture.completedFuture(null);
    }
}
